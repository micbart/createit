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
        ];

        $result = $this->query($params); 

        return $result; 
    } 
 
    public function query($query)
    { 
        return $query; 
    } 
}
