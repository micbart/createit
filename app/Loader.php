<?php

namespace Createit\App;

use Createit\App\InvoicePostType;
use Createit\App\PostMetaBox;
use Createit\App\Api;

class Loader
{
    public function __construct()
    {
        $this->loadFiles();
        $this->init();
    }

    private $files = [
        'InvoicePostType.php',
        'Invoice.php',
        'PostMetaBox.php',
        'Api.php'
    ];

    public function loadFiles()
    {
        foreach ($this->files as $file) {
            require_once $file;
        }
    }

    public function init()
    {
        new InvoicePostType();
        new PostMetaBox();
        new Api();
    }
}

new Loader();