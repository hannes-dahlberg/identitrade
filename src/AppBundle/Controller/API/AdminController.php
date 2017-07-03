<?php namespace AppBundle\Controller\API;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use OTPHP\TOTP;
use Base32\Base32;

class AdminController {
    public function authAction() {
        //Authenticate with password and return JWT-token if success
    }
    public function viewAction() {
        //View all users
    }
}