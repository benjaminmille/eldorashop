<?php

namespace App\Entity;

use App\Repository\CategoryRepository;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CategoryRepository::class)]
class Category
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    #[Groups(['ad:list',  'ad:read'])]
    private string $name;

    #[ORM\OneToMany(targetEntity: Ad::class, mappedBy: 'category')]
    private $ads;

    public function __construct() {
        $this->ads = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getAds(): ArrayCollection
    {
        return $this->ads;
    }

    public function setAds(ArrayCollection $ads): void
    {
        $this->ads = $ads;
    }
}
