<?php namespace AppBundle\Controller\API;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Noxlogic\RateLimitBundle\Annotation\RateLimit;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use \Firebase\JWT\JWT;
use AppBundle\Entity\User;

class AdminController extends controller {

    /**
     * @RateLimit(Limit=4, period=10)
     */
    public function authAction(Request $request) {
        //Get json params sent
        $json = $this->getJsonData();

        //Authenticate with password and return JWT-token if success
        if($json['password'] === $this->container->getParameter('admin_password')) {
            //Get JWT key and set issue time and expiration time
            $key = $this->container->getParameter('jwt_key');
            $iat = time();
            $exp = time() + $this->container->getParameter('jwt_ttl');
            $token = [
                'iat' => $iat,
                'exp' => $exp
            ];

            //Creates token and send
            $token = JWT::encode($token, $key);
            return new JsonResponse([
                'token' => $token,
                'expires' => $exp
            ]);
        } else {
            return new JsonResponse(['message' => 'authentication failed'], 403);
        }
    }

    /**
     * @RateLimit(Limit=4, period=10)
     */
    public function viewAction(Request $request) {
        //Check for authorization header
        if($request->headers->get('Authorization')) {
            //Get JWT key, and token from header
            $key = $this->container->getParameter('jwt_key');
            $jwt = substr($request->headers->get('Authorization'), 7, strlen($request->headers->get('Authorization')));

            try { //Try decoding token
                $decoded = JWT::decode($jwt, $key, ['HS256']);
            } catch(\DomainException | \InvalidArgumentException | \UnexpectedValueException \FireBase\JWT\SignatureInvalidException | \FireBase\JWT\ExpiredException $e) {
                //If expired
                if(get_class($e) == 'Firebase\JWT\ExpiredException') {
                    $errorMessage = 'Token expired';
                } else { //Any other error
                    $errorMessage = 'Token invalid';
                }

                //Return error
                return new JsonResponse(['message' => $errorMessage], 401);
            }
        } else { //No header was set
            return new JsonResponse(['message' => 'Missing authorization header'], 401);
        }

        //View all users
        $em = $this->getDoctrine()->getManager();
        $users = $em->getRepository(User::class)->findAll();

        //Holder for user array
        $return = [];
        foreach($users as $user) {
            //Add each user to array
            $return[] = [
                'email' => $user->getEmail()
            ];
        }

        //Return users
        return new JsonResponse(['users' => $return]);
    }

    private function getJsonData() {
        $params = [];
        $content = $this->get("request")->getContent();
        if (!empty($content)) {
            $params = json_decode($content, true);
        }

        return $params;
    }
}