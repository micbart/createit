<?php
namespace Createit\App;

use Createit\App\Invoice;

class PostMetaBox extends Invoice
{
    public function __construct()
    {
        add_action('add_meta_boxes', [$this, 'addMetabox']);
        add_action('save_post', [$this, 'saveMetabox'], 10, 2);
    }

    public function addMetabox()
    {
        add_meta_box('invoice_metafields', __('Invoice options', 'createit'), [$this, 'metaboxCallback'], 'invoice'); 
    }

    public function metaboxCallback($post)
    {
        wp_nonce_field( 'somerandomstr', '_createit');

        ?>
        <div class="row">
            <?php
                echo $this->stausField($post);
                echo $this->totalField($post);
                echo $this->ordersField($post);
                echo $this->startDateField($post);
                echo $this->endDateField($post);
            ?>
        </div>
        <?php
    }

    public function saveMetabox($post_id, $post) {
        if (!isset($_POST['_createit']) || !wp_verify_nonce($_POST['_createit'], 'somerandomstr')) {
            return $post_id;
        }

        $post_type = get_post_type_object($post->post_type);

        if (!current_user_can($post_type->cap->edit_post, $post_id)) {
            return $post_id;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return $post_id;
        }

        if ('invoice' !== $post->post_type) {
            return $post_id;
        }

        foreach (array_keys($this->fields()) as $value) {
            if (isset($_POST[$value])) {
                if ($value == 'invoice_end_date') {
                    if (date('Y-m-d', strtotime($_POST['invoice_start_date'])) < date('Y-m-d', strtotime($_POST['invoice_end_date']))) {
                        update_post_meta($post_id, $value, sanitize_text_field($_POST[$value]));
                    } else {
                        delete_post_meta($post_id, $value);
                    }
                } else {
                    update_post_meta($post_id, $value, sanitize_text_field($_POST[$value]));
                }
            } else {
                delete_post_meta($post_id, $value);
            }
        }

        return $post_id;
    }

    public function stausField($post)
    {
        $activeOptions = get_post_meta($post->ID, 'invoice_status', true);
        $options = '';

        foreach ($this->fields()['invoice_status']['options'] as $key => $value) {
            $options .= '<option value="' . $value . '"' . selected($activeOptions, $value, false) . '>' . $value . '</option>';
        }

        return
            '<div>
                <div class="label">' . $this->fields()['invoice_status']['title'] . '</div>
                <select name="invoice_status" id="invoice_status">
                    '. $options .'
                </select>
            </div>';
    }

    public function totalField($post)
    {
        $field = get_post_meta($post->ID, 'invoice_total', true);

        return 
            '<div>
                <div class="label">' . $this->fields()['invoice_total']['title'] . '</div>
                <input type="number" id="invoice_total" name="invoice_total" value="' . $field . '">
            </div>';
    }

    public function ordersField($post)
    {
        $field = get_post_meta($post->ID, 'invoice_orders', true);

        return 
            '<div>
                <div class="label">' . $this->fields()['invoice_orders']['title'] . '</div>
                <input type="number" id="invoice_orders" name="invoice_orders" value="' . $field . '">
            </div>';
    }

    public function startDateField($post)
    {
        $field = get_post_meta($post->ID, 'invoice_start_date', true);

        return 
            '<div>
                <div class="label">' . $this->fields()['invoice_start_date']['title'] . '</div>
                <input type="date" id="invoice_start_date" name="invoice_start_date" value="' . $field . '">
            </div>';
    }

    public function endDateField($post)
    {
        $field = get_post_meta($post->ID, 'invoice_end_date', true);

        return 
            '<div>
                <div class="label">' . $this->fields()['invoice_end_date']['title'] . '</div>
                <input type="date" id="invoice_end_date" name="invoice_end_date" value="' . $field . '">
            </div>';
    }
}