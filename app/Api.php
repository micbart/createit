<?php
namespace Createit\App;

use Createit\App\Invoice;
use WP_Query; 
use WP_REST_Request; 
 
class Api extends Invoice
{ 
    public function __construct() 
    { 
        add_action('rest_api_init', [$this, 'registerRestApiRoutes']); 
    } 
 
    public function registerRestApiRoutes() 
    { 
        register_rest_route( 'createit', '/ivoices', [
            'methods' => 'GET',
            'callback' => [$this, 'result'], 
            'permission_callback' => '__return_true',
            'args' => [
                'page' => [
                    'required' => true,
                    'validate_callback' => [$this, 'validateCallbackPage'] 
                ],
                'status' => [ 
                    'required' => true, 
                    'validate_callback' => [$this, 'validateCallbackStatus'] 
                ],
                'dateStart' => [ 
                    'required' => true, 
                    'validate_callback' => [$this, 'validateCallbackDate'] 
                ], 
                'dateEnd' => [ 
                    'required' => true, 
                    'validate_callback' => [$this, 'validateCallbackDate'] 
                ],
                'search' => [ 
                    'required' => true, 
                    'sanitize_callback' => [$this, 'sanitizeCallbackSearch'] 
                ], 
            ],
        ]);
    } 
 
    public function validateCallbackPage($param) 
    { 
        if (!$param) {
            return;
        }

        return is_numeric($param);
    } 

    public function validateCallbackStatus($param) 
    { 
        if (!$param) {
            return;
        }

        return in_array($param, $this->status);
    } 

    public function validateCallbackDate($param) 
    { 
        if (!$param) {
            return;
        }

        return strtotime($param);
    } 

    public function sanitizeCallbackSearch($param) 
    { 
        $param = wp_kses($param, []); 
        return $param; 
    } 
 
    public function result(WP_REST_Request $request)
    { 
        $params = [
            'page' => $request->get_param('page'),
            'status' => $request->get_param('status'),
            'search' => $request->get_param('search'),
            'dateStart' => $request->get_param('dateStart'),
            'dateEnd' => $request->get_param('dateEnd'),
        ];

        $result = $this->query($params); 

        return $result; 
    } 
    
    public function query($query)
    { 
        $args = [ 
            'post_type' => 'invoice', 
            'posts_per_page' => $this->perPage,
            'paged' => $query['page'] ?: 1,
            'orderby' => 'date',
            'order' => 'DESC',
        ]; 

        if ($query['search']) {
            $args['s'] = $query['search'];
        }

        $metaQuery = [];

        if ($query['status']) {
            $metaQuery[] = [
                'key' => 'invoice_status',
                'value' => $query['status'],
            ];
        }

        if ($query['dateStart'] && $query['dateEnd']) {
            $metaQuery[] =[
                'key' => 'invoice_start_date',
                'value' => date('Ymd', strtotime($query['dateStart'])),
                'type' => 'date',
                'compare' => '>='
            ];
            $metaQuery[] = [
                'key' => 'invoice_end_date',
                'value' => date('Ymd', strtotime($query['dateEnd'])),
                'type' => 'date',
                'compare' => '<='
            ];
        }

        if (!empty($metaQuery)) {
            $args['meta_query'] = [
                'relation' => 'AND',
                $metaQuery
            ]; 
        }
        
        $resultArray = [];

        $queryInvoice = new WP_Query($args); 

        if ($queryInvoice->have_posts()) {
            foreach ($queryInvoice->posts as $post) {
                $resultArray[] = [
                    'id' => $post->ID,
                    'name' => get_the_title($post->ID), 
                    'image' => get_the_post_thumbnail_url($post->ID, 'thumbnail') ?: '', 
                    'url' => esc_url(get_permalink($post->ID)),
                    'status' => get_post_meta($post->ID, 'invoice_status', true),
                    'startDate' => get_post_meta($post->ID, 'invoice_start_date', true),
                    'endDate' => get_post_meta($post->ID, 'invoice_end_date', true),
                    'total' => get_post_meta($post->ID, 'invoice_total', true),
                    'fees' => $this->calkulateFees(get_post_meta($post->ID, 'invoice_total', true)),  
                    'orders' => get_post_meta($post->ID, 'invoice_orders', true) 
                ]; 
            }
        }

        return [
            'items' => $resultArray,
            'currentPage' => intval($query['page']),
            'maxPage' => ceil($queryInvoice->found_posts / $this->perPage)
        ];
         
    } 
}
