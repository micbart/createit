<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://github.com/micbart/
 * @since             1.0.0
 * @package           createit
 *
 * @wordpress-plugin
 * Plugin Name:       CreateIT
 * Description:       CreateIT
 * Version:           1.0.0
 * Author:            Michal Bartczak
 * Author URI:        https://github.com/micbart/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       createit
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if(!defined('WPINC')) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.function
 */
define('createit_VERSION', '1.0.0');

function createitActivation() 
{
    add_option('createitActivationRewriteRules', true);
}
register_activation_hook(__FILE__, 'createitActivation');

function createitFlushRewriteRules() {
	if (get_option('createitActivationRewriteRules') && is_admin()) {
		flush_rewrite_rules();
		delete_option('createitActivationRewriteRules');
	}
}
add_action('admin_init', 'createitFlushRewriteRules');

if(!class_exists('Createit')) {
	class Createit
    {
		/**
		 * The unique identifier of this plugin.
		 *
		 * @since    1.0.0
		 * @access   protected
		 * @var      string    $createit The string used to uniquely identify this plugin.
		 */
		protected $createit;

		/**
		 * Define the core functionality of the plugin.
		 *
		 * Set the plugin name and the plugin version that can be used throughout the plugin.
		 * Load the dependencies, define the locale, and set the hooks for the admin area and
		 * the public-facing side of the site.
		 *
		 * @since    1.0.0
		 */
		public function __construct()
        {
			$this->createit = 'CreateIT';
			$this->app();
			add_action('wp_enqueue_scripts', [$this, 'registerPublicStyles']);
		}

		public function registerPublicStyles()
		{
			wp_enqueue_style('createit-style', plugin_dir_url(__FILE__) . 'dist/css/main.min.css');
			wp_enqueue_script('createit-script', plugin_dir_url(__FILE__) . 'dist/js/script.min.js', [], '', true);

			wp_localize_script(
				'createit-script',
				'appCreateit',
				[
					'jsonurl' => get_rest_url(),
					'ajaxurl' => admin_url('admin-ajax.php'),
					'nonce' => wp_create_nonce('nonce-createit')
				]
			);
		}

		public function app()
		{
			require_once 'app/Loader.php';
		} 
	}

	new Createit();
}