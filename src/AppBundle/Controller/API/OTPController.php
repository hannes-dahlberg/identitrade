<?php namespace AppBundle\Controller\API;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Noxlogic\RateLimitBundle\Annotation\RateLimit;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use OTPHP\TOTP;
use AppBundle\Entity\User;
use Swift_Message;

class OTPController extends Controller {
    /**
     * @RateLimit(Limit=1, period=10)
     */
    public function sendEmailAction(Request $request) {
        //Entity manager
        $em = $this->getDoctrine()->getManager();

        //Check if user (by email) is not in the DB
        if(!$user = $this->getUserByEmail($em, $request->request->get('email'))) {
            /*Creates new user object and set email posted by user as well as
            generated secret*/
            $user = new User();
            $user->setEmail($request->request->get('email'));
            $user->setOtpSecret(\Base32\Base32::encode(random_bytes(256)));

            //Validates user object
            $validator = $this->get('validator');
            $errors = $validator->validate($user);

            //If validation fails return error
            if (count($errors) > 0) {
                return new JsonResponse((string) $errors, 403);
            }

            //Save user to DB
            $em->persist($user);
            $em->flush();
        }

        //Creates a new totp object using user email and secret
        $totp = $this->getNewTotp($user->getEmail(), $user->getOtpSecret());

        //Generates a new OTP code
        $otp = $totp->now();

        //Send email to user with otp code
        $this->get('mailer')->send((new Swift_Message('Identitrade OTP code'))
            ->setFrom('noreply@gmail.com')
            ->setTo($user->getEmail())
            ->setBody($this->renderView(
                'emails/otp.html.twig',
                ['code' => $otp]
            ), 'text/html')
        );

        //Return 200
        return new JsonResponse(['message' => 'email sent'], 200);
    }

    /**
     * @RateLimit(Limit=4, period=10)
     */
    public function validateAction(Request $request) {
        //Entity manager
        $em = $this->getDoctrine()->getManager();

        //Check for user in DB
        if($user = $this->getUserByEmail($em, $request->request->get('email'))) {
            //get new totp
            $totp = $this->getNewTotp($user->getEmail(), $user->getOtpSecret());
            if($totp->verify($request->request->get('otp'))) {
                //OTP was correct
                return new JsonResponse(['message' => 'valid'], 200);
            }
        }

        //Returns 404
        return new JsonResponse(['message' => 'Validation failed or user was not found'], 404);
    }

    private function getUserByEmail($em, $email) {
        return $em->getRepository(User::class)->findOneByEmail($email);
    }

    private function getNewTotp($label, $secret) {
        //Creates a new totp object using user label and secret
        return new TOTP(
            $label, //Label
            $secret, //Secret
            $this->container->getParameter('totp_period'), //Period (seconds the code is valid)
            $this->container->getParameter('totp_algorithm'), //Algorithm
            $this->container->getParameter('totp_digits') //Code length
        );
    }
}