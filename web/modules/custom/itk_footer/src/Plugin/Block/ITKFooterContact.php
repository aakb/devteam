<?php

namespace Drupal\itk_footer\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides itk_footer_contact content
 *
 * @Block(
 *   id = "itk_footer_contact",
 *   admin_label = @Translation("ITK footer contact"),
 * )
 */
class ITKFooterContact extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $config = \Drupal::getContainer()->get('itk_footer.config')->getAll();
    $config['contact_html'] = check_markup($config['itk_footer_contact'], 'filtered_html');

    return array (
      '#type' => 'markup',
      '#theme' => 'itk_footer_contact',
      '#variables' => $config,
    );
  }

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);

    return $form;
  }
}
?>