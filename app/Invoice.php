<?php
namespace Createit\App;

class Invoice
{
    protected function fields()
    {
        return [
            'invoice_status' => [
                'title' => __('Status', 'createit'),
                'options' => $this->status
            ],
            'invoice_total' => [
                'title' => __('Total', 'createit'),
            ],
            'invoice_orders' => [
                'title' => __('Orders', 'createit'),
            ]
        ];
    } 

    protected $status = [
        'ongoing',
        'pending',
        'verified'
    ];
}