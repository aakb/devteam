<?php

namespace Drupal\itk_footer\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Provides itk_footer_bottom content
 *
 * @Block(
 *   id = "itk_footer_bottom",
 *   admin_label = @Translation("ITK footer bottom"),
 * )
 */
class ITKFooterBottom extends BlockBase {
  /**
   * {@inheritdoc}
   */
  public function build() {
    $config = \Drupal::getContainer()->get('itk_footer.config')->getAll();

    return array (
      '#type' => 'markup',
      '#theme' => 'itk_footer_bottom',
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