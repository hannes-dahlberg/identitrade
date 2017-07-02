<?php namespace AppBundle\Controller\API;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;

class OTPController {
    /**
     * @Route("/")
     * @Method("POST")
     */
    public function sendEmailAction() {

    }

    /**
     * @Route("/auth")
     * @Method("POST")
     */
    public function validateAction() {

    }
}