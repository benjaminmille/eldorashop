<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $categories = ['Électronique', 'Maison', 'Véhicules', 'Jeux & Jouets', 'Sport & Loisirs'];

        foreach ($categories as $i => $name) {
            $category = new Category();
            $category->setName($name);

            $manager->persist($category);
            $this->addReference("category$i", $category);
        }

        $manager->flush();
    }
}
