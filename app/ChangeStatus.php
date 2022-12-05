<?php
namespace Createit\App;

use Createit\App\Invoice;

class ChangeStatus extends Invoice
{ 
    public function __construct() 
    { 
        add_action('wp_ajax_createit_change_status', [$this, 'ajaxChangeStatus']);
        add_action('wp_ajax_nopriv_createit_change_status', [$this, 'ajaxChangeStatus']);
    } 

    public function ajaxChangeStatus()
    {
        if (!wp_verify_nonce($_POST['nonce'], 'nonce-createit')) {
            wp_send_json_error();
        }

        if (!isset($_POST['ids']) || !is_array(json_decode($_POST['ids']))) {
            wp_send_json_error();
        }

        foreach (json_decode($_POST['ids']) as $id) {
            if (get_post_type($id) == 'invoice' && get_post_meta($id, 'invoice_status', true) != 'verified') {
                update_post_meta($id, 'invoice_status', 'verified');
            }
        }

        wp_send_json_success();
    }
}
