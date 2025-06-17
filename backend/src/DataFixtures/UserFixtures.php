<?php

namespace App\DataFixtures;

use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class UserFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Admin
        $admin = new User();
        $admin->setUsername('admin');
        $admin->setName('Admin Istrateur');
        $admin->setEmail('admin@eldorashop.fr');
        $admin->setRoles(['ROLE_ADMIN']);
        $admin->setPassword($this->passwordHasher->hashPassword($admin, 'adminpass'));

        $manager->persist($admin);
        $this->addReference("user0", $admin);

        // Utilisateurs classiques
        for ($i = 1; $i <= 4; $i++) {
            $user = new User();
            $user->setUsername("user$i");
            $user->setName("Utilisateur $i");
            $user->setEmail("user$i@eldorashop.fr");
            $user->setRoles(['ROLE_USER']);
            $user->setPassword($this->passwordHasher->hashPassword($user, 'userpass'));

            $manager->persist($user);
            $this->addReference("user{$i}", $user);
        }

        $manager->flush();
    }
}
