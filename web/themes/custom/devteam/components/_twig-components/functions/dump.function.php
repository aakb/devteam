<?php
/**
 * @file
 * Add "dump" function for Pattern Lab.
 */

$function = new Twig_SimpleFunction('dump', function ($string) {
  return $string;
});
