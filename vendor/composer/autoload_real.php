<?php

// autoload_real.php @generated by Composer

class ComposerAutoloaderInit7b6a13080ea2beaf5d81b4d86758c4f5
{
    private static $loader;

    public static function loadClassLoader($class)
    {
        if ('Composer\Autoload\ClassLoader' === $class) {
            require __DIR__ . '/ClassLoader.php';
        }
    }

    /**
     * @return \Composer\Autoload\ClassLoader
     */
    public static function getLoader()
    {
        if (null !== self::$loader) {
            return self::$loader;
        }

        spl_autoload_register(array('ComposerAutoloaderInit7b6a13080ea2beaf5d81b4d86758c4f5', 'loadClassLoader'), true, true);
        self::$loader = $loader = new \Composer\Autoload\ClassLoader(\dirname(__DIR__));
        spl_autoload_unregister(array('ComposerAutoloaderInit7b6a13080ea2beaf5d81b4d86758c4f5', 'loadClassLoader'));

        require __DIR__ . '/autoload_static.php';
        call_user_func(\Composer\Autoload\ComposerStaticInit7b6a13080ea2beaf5d81b4d86758c4f5::getInitializer($loader));

        $loader->register(true);

        return $loader;
    }
}
