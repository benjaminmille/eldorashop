<?php

namespace App\DTO;

use Symfony\Component\Validator\Constraints as Assert;

class AdRequest
{
    public function __construct(
        #[Assert\NotBlank(message: "Le titre de l'annonce est obligatoire.")]
        #[Assert\Length(
            min: 5,
            max: 100,
            minMessage: "Le titre doit contenir au moins {{ limit }} caractères.",
            maxMessage: "Le titre ne peut pas dépasser {{ limit }} caractères."
        )]
        public string $title,

        #[Assert\NotBlank(message: "La description de l'annonce est obligatoire.")]
        #[Assert\Length(
            min: 10,
            minMessage: "La description doit contenir au moins {{ limit }} caractères."
        )]
        public string $description,

        #[Assert\NotNull(message: "Le prix est obligatoire.")]
        #[Assert\Positive(message: "Le prix doit être un nombre positif.")]
        public float $price,

        #[Assert\NotBlank(message: "Le lieu est requis.")]
        public string $location,

        #[Assert\NotBlank(message: "La catégorie est obligatoire.")]
        public string $categoryId,

        #[Assert\NotBlank(message: "L'utilisateur associé est obligatoire.")]
        public string $userId,
    ) {}
}
