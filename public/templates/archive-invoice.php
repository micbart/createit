<?php
use Createit\App\TemplateArchive;

$template = new TemplateArchive;

get_header();
?>
    <div id="invoices">
        <h1 class="title-invoices--main"><?php echo $template->titleHeader(); ?></h1>

        <nav class="invoice-nav">
            <div id="invoice-status">
                <a href="#" class="toggler-status active" data-status="">
                    <?php echo __('All', 'createit'); ?>
                </a>    
                <?php 
                    foreach ($template->getStatus() as $status) {
                        ?>
                            <a href="#<?php echo $status ?>" class="toggler-status" data-status="<?php echo $status; ?>">
                                <?php echo $status; ?>
                            </a>    
                        <?php
                    }
                ?>
            </div>

            <div id="invoice-date-piceker">
                <div class="invoice-date-piceker__block">
                    <span class="invoices-label"><?php echo __('From', 'createit'); ?></span>
                    <input type="date" id="invoice-date-piceker--start">
                    <input type="date" id="invoice-date-piceker--end">
                </div>
            </div>

            <div id="invoice-search">
                <input type="text" id="invoice-search--field" placeholder="<?php echo __('Search', 'createit') ?>">
                <button type="submit" id="invoice-search--submit"></button>
            </div>

            <div>
                <button id="invoice-button-paid" class="invoice-button orange">
                    <?php echo __('Mark as paid', 'createit'); ?>
                </button>
            </div>
        </nav>

        <div class="invoice-table">
            <ul class="invoice-table__labels">
                <?php 
                    foreach ($template->getTableLabels() as $key => $value) {
                        ?>
                            <li class="invoice-table--label <?php echo $key; ?>">
                                <span><?php echo $value; ?></span>
                            </li>
                        <?php
                    }
                ?>
            </ul>

            <ul id="result-invoice" class="invoice-table__result loading">
                
            </ul>
        </div>
    </div>
<?php
get_footer();
