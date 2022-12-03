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
            ],
            'invoice_start_date' => [
                'title' => __('Orders', 'createit'),
            ],
            'invoice_end_date' => [
                'title' => __('Orders', 'createit'),
            ]
        ];
    } 

    protected $status = [
        'ongoing',
        'pending',
        'verified'
    ];

    protected $perPage = 10;

    protected $tax = 0.23;

    public function calkulateFees($total)
    {
        if($total) {
            return $total * $this->tax;
        }

        return '';
    }
}