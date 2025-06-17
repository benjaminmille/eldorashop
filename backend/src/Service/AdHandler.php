<?php

namespace App\Service;

use App\DTO\AdRequest;
use App\Entity\Ad;
use App\Repository\CategoryRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class AdHandler
{
    public function __construct(
        private EntityManagerInterface $em,
        private ValidatorInterface     $validator,
        private UserRepository         $userRepository,
        private CategoryRepository     $categoryRepository
    ) {}

    public function create(AdRequest $dto): Ad
    {
        $category = $this->categoryRepository->find($dto->categoryId);
        $user = $this->userRepository->find($dto->userId);

        $ad = new Ad();
        $ad->setTitle($dto->title);
        $ad->setDescription($dto->description);
        $ad->setPrice($dto->price);
        $ad->setCategory($category);
        $ad->setLocation($dto->location);
        $ad->setOwner($user);

        $this->em->persist($ad);
        $this->em->flush();

        return $ad;
    }

    public function update(Ad $ad, AdRequest $dto): Ad
    {
        $category = $this->categoryRepository->find($dto->categoryId);
        if (!$category) {
            throw new \InvalidArgumentException("Catégorie introuvable");
        }

        $ad->setTitle($dto->title);
        $ad->setDescription($dto->description);
        $ad->setPrice($dto->price);
        $ad->setCategory($category);
        $ad->setLocation($dto->location);

//        if ($dto->userId && $ad->getOwner()?->getId() !== $dto->userId) {
//            $user = $this->userRepository->find($dto->userId);
//            if (!$user) {
//                throw new \InvalidArgumentException("Utilisateur introuvable");
//            }
//            $ad->setOwner($user);
//        }

        $this->em->flush();

        return $ad;
    }
}
