<?php
namespace Createit\App;

use Createit\App\Invoice;

class TemplateArchive extends Invoice
{

    public function titleHeader()
    {
        return __('Invoices', 'createit');
    }

    public function getStatus()
    {
        return $this->status;
    }

    public function getTableLabels()
    {
        return [
            'check' => '',
            'id' => __('Id', 'createit'), 
            'restaurant' => __('Restaurant', 'createit'), 
            'status' => __('Status', 'createit'),
            'start-date' => __('Start date', 'createit'),
            'end-date' => __('End date', 'createit'),
            'total' => __('Total', 'createit'),
            'fees' => __('Fees', 'createit'),
            'orders' => __('Orders', 'createit')
        ];
    }
}