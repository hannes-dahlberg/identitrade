<?php namespace AppBundle\Controller\API;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use OTPHP\TOTP;
use AppBundle\Entity\User;

class OTPController {
    /**
     * @Route("/")
     * @Method("POST")
     */
    public function sendEmailAction(Request $request) {
        //Entity manager
        $em = $this->getDoctrine()->getManager();

        //Check if user (by email) is not in the DB
        if(!$user = $this->getUserByEmail($em, $request->getPost('email'))) {
            /*Creates new user object and set email posted by user as well as
            generated secret*/
            $user = new User();
            $user->setEmail($request->getPost('email'));
            $user->setOtpSecret(Base32\Base32::encode(random_bytes(256)));

            //Saves to DB
            $em->persist($user);
            $em->flush();
        }

        //Creates a new totp object using user email and secret
        $totp = new TOTP($user->getEmail(), $user->getOtpSecret(), 600, 'sha512', 4);

        //Generates a new OTP code
        $otp = $totp->now();

        //Send email to user with otp code
    }

    /**
     * @Route("/auth")
     * @Method("POST")
     */
    public function validateAction() {
        //Entity manager
        $em = $this->getDoctrine()->getManager();


        if($user = $this->getUserByEmail($em, $request->getPost('email'))) {
            $totp = new TOTP($user->getEmail(), $secret, 600, 'sha512', 4);
            if($totp->verify($request->getPost('otp'))) {
                //OTP was correct
            } else {
                //OTP was incorrect
            }
        }

        //Returns 403
    }

    private function getUserByEmail($em, $email) {
        return $em->getRepository(User::class)->findOneByEmail($email);
    }
}