<?php

namespace App\Entity;

use App\Repository\AdRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: AdRepository::class)]
class Ad
{
    #[ORM\Id, ORM\GeneratedValue, ORM\Column]
    #[Groups(['ad:list', 'ad:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['ad:list', 'ad:read'])]
    private string $title;

    #[ORM\Column(type: 'text')]
    #[Groups(['ad:list', 'ad:read'])]
    private string $description;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    #[Groups(['ad:list', 'ad:read'])]
    private float $price;

    #[ORM\Column(length: 100)]
    #[Groups(['ad:list', 'ad:read'])]
    private string $location;

    #[ORM\Column(type: 'float', nullable: true)]
    #[Groups(['ad:read'])]
    private ?float $latitude = null;

    #[ORM\Column(type: 'float', nullable: true)]
    #[Groups(['ad:read'])]
    private ?float $longitude = null;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['ad:list', 'ad:read'])]
    private \DateTimeInterface $createdAt;

    #[ORM\ManyToOne(inversedBy: 'ads')]
    #[Groups(['ad:list', 'ad:list', 'ad:read'])]
    private ?User $owner = null;

    #[ORM\ManyToOne(inversedBy: 'ads')]
    #[Groups(['ad:list', 'ad:read'])]
    private ?Category $category = null;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['ad:read'])]
    private bool $isAvailable = true;

    #[ORM\Column(type: 'json', nullable: true)]
    #[Groups(['ad:list', 'ad:read'])]
    private ?array $images = null;


    public function __construct() {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function setPrice(float $price): void
    {
        $this->price = $price;
    }

    public function getLocation(): string
    {
        return $this->location;
    }

    public function setLocation(string $location): void
    {
        $this->location = $location;
    }

    public function getLatitude(): ?float
    {
        return $this->latitude;
    }

    public function setLatitude(?float $latitude): void
    {
        $this->latitude = $latitude;
    }

    public function getLongitude(): ?float
    {
        return $this->longitude;
    }

    public function setLongitude(?float $longitude): void
    {
        $this->longitude = $longitude;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): void
    {
        $this->owner = $owner;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): void
    {
        $this->category = $category;
    }

    public function isAvailable(): bool
    {
        return $this->isAvailable;
    }

    public function setIsAvailable(bool $isAvailable): void
    {
        $this->isAvailable = $isAvailable;
    }

    public function getImages(): ?array
    {
        return $this->images;
    }

    public function setImages(?array $images): void
    {
        $this->images = $images;
    }

    public function hasCoordinates(): bool
    {
        return $this->latitude !== null && $this->longitude !== null;
    }

    public function getCoordinates(): ?array
    {
        if (!$this->hasCoordinates()) {
            return null;
        }

        return [
            'lat' => $this->latitude,
            'lng' => $this->longitude,
        ];
    }

    public function setCoordinates(?float $lat, ?float $lng): void
    {
        $this->latitude = $lat;
        $this->longitude = $lng;
    }
}
