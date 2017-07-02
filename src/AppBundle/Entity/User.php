<?php namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="users")
 */
class User {
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=416)
     */
    private $email;

    /**
     * @ORM\Column(type="string")
     */
    private $otpSecret;

    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set email
     *
     * @param string $email
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set otpSecret
     *
     * @param string $otpSecret
     * @return User
     */
    public function setOtpSecret($otpSecret)
    {
        $this->otpSecret = $otpSecret;

        return $this;
    }

    /**
     * Get otpSecret
     *
     * @return string
     */
    public function getOtpSecret()
    {
        return $this->otpSecret;
    }
}
