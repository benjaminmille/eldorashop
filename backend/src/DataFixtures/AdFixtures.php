<?php

namespace App\DataFixtures;

use App\Entity\Ad;
use App\Entity\Category;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;

class AdFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        $categoryIds = [51, 52, 53, 54, 55];

        for ($i = 0; $i < 2500; $i++) {
            $categoryId = $faker->randomElement($categoryIds);

            $ad = new Ad();

            $ad->setTitle($faker->realText(40));
            $ad->setDescription($faker->paragraphs(2, true));
            $ad->setPrice($faker->randomFloat(2, 5, 1500));
            $ad->setLocation($faker->city);
            $ad->setCreatedAt($faker->dateTimeBetween('-6 months'));
            $ad->setIsAvailable(true);
            $ad->setLatitude(mt_rand(430000, 490000) / 10000);
            $ad->setLongitude(mt_rand(-10000, 70000) / 10000);
            $ad->setImages(["https://picsum.photos/200/300?random={$i}"]);

            $manager->persist($ad);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            UserFixtures::class,
            CategoryFixtures::class,
        ];
    }
}
