<?php
use Createit\App\Invoice;

$invoice = new Invoice;

get_header();
?>
    <div id="invoices">
        <h1 class="title-invoices--main"><?php echo get_the_title(); ?></h1>
        <div class="single-invoice">
            <p><stron><?php echo __('ID', 'createit'); ?></stron>: #<?php echo get_the_ID(); ?></p>
            <p><stron><?php echo __('Status', 'createit'); ?></stron>: <?php echo get_post_meta(get_the_ID(), 'invoice_status', true); ?></p>
            <p><stron><?php echo __('Start date', 'createit'); ?></stron>: <?php echo date('d/m/Y', strtotime(get_post_meta(get_the_ID(), 'invoice_start_date', true))); ?></p>
            <p><stron><?php echo __('End date', 'createit'); ?></stron>: <?php  echo date('d/m/Y', strtotime(get_post_meta(get_the_ID(), 'invoice_end_date', true))); ?></p>
            <p><stron><?php echo __('Total', 'createit'); ?></stron>: $<?php echo get_post_meta(get_the_ID(), 'invoice_total', true) ?: '0'; ?></p>
            <p><stron><?php echo __('Fees', 'createit'); ?></stron>: $<?php echo $invoice->calkulateFees(get_post_meta(get_the_ID(), 'invoice_total', true)) ?: '0'; ?></p>
            <p><stron><?php echo __('Orders', 'createit'); ?></stron>: <?php echo get_post_meta(get_the_ID(), 'invoice_orders', true); ?></p>

        </div>
    </div>
<?php
get_footer();
