<?php

namespace Createit\App;

use Createit\App\InvoicePostType;
use Createit\App\PostMetaBox;
use Createit\App\Api;
use Createit\App\TemplateArchive;
use Createit\App\ChangeStatus;

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
        'Api.php',
        'TemplateArchive.php',
        'ChangeStatus.php'
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
        new TemplateArchive();
        new ChangeStatus();
    }
}

new Loader();