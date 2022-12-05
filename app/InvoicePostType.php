<?php

namespace Createit\App;

class InvoicePostType
{
    public function __construct()
    {
        add_action('init', [$this, 'registerPostType']);
        add_action('archive_template', [$this, 'renderArchiveTemplate']);
        add_action('single_template', [$this, 'renderSingleTemplate']);
    }

    private $postType = 'invoice';

    public function registerPostType()
    {
        $labels = array( 
            'name' => __('Invoices', 'createit'),
            'singular_name' => __('Invoices', 'createit'),
            'add_new' => __('Add New', 'createit'),
            'add_new_item' => __('Add New Invoice', 'createit'),
            'edit_item' => __('Edit Invoice', 'createit'),
            'new_item' => __('New Invoice', 'createit'),
            'view_item' => __('View Invoice', 'createit'),
            'search_items' => __('Search Invoices', 'createit'),
            'not_found' => __('No Invoice found', 'createit'),
            'not_found_in_trash' => __('No Invoices found in Trash', 'createit'),
            'parent_item_colon' => __('Parent Invoice:', 'createit'),
            'menu_name' => __('Invoices', 'createit'),
        );
    
        $args = array( 
            'labels' => $labels,
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'show_in_nav_menus' => true,
            'show_in_admin_bar'=> true,
            'menu_position' => 5,
            'can_export' => true,
            'has_archive' => true,
            'exclude_from_search' => false,
            'publicly_queryable' => true,
            'capability_type' => 'post',
            'supports' => ['title', 'thumbnail'],
            'show_in_rest' => true,
            'menu_icon' => 'dashicons-calendar',
            'rewrite' => [
                'slug' => 'invoices',
                'with_front' => false
            ]
        );

        register_post_type($this->postType, $args);
    }

    public function renderArchiveTemplate($template)
    {
        if (is_post_type_archive($this->postType)) {
            $template = dirname(__FILE__, 2) . '/public/templates/archive-' . $this->postType . '.php';
        }

        return $template;
    }

    public function renderSingleTemplate($template){
        if ($this->postType === get_post_type()) {
            $template = dirname(__FILE__, 2) . '/public/templates/single-' . $this->postType . '.php';
        }

        return $template;
    }
}