<?php

namespace App\Service;

use App\Entity\Ad;
use Elastic\Elasticsearch\Client;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;

class AdIndexer
{
    private const INDEX = 'ads';

    public function __construct(
        private readonly Client              $client,
        private readonly NormalizerInterface $normalizer,
    ) {}

    public function createIndex(): void
    {
        if ($this->client->indices()->exists(['index' => self::INDEX])) {
            return;
        }

        $this->client->indices()->create([
            'index' => self::INDEX,
            'body' => [
                'mappings' => [
                    'properties' => [
                        'id' => ['type' => 'integer'],
                        'title' => ['type' => 'text'],
                        'description' => ['type' => 'text'],
                        'price' => ['type' => 'float'],
                        'location' => ['type' => 'keyword'],
                        'isAvailable' => ['type' => 'boolean'],
                        'category' => ['type' => 'keyword'],
                        'owner' => ['type' => 'keyword'],
                        'createdAt' => ['type' => 'date', 'format' => 'strict_date_optional_time||epoch_millis'],
                    ]
                ]
            ]
        ]);
    }

    public function indexAd(Ad $ad): void
    {
        $this->client->index([
            'index' => self::INDEX,
            'id' => $ad->getId(),
            'body' => $this->normalizeAd($ad),
        ]);
    }

    public function removeAd(int $id): void
    {
        $this->client->delete([
            'index' => self::INDEX,
            'id' => $id,
        ]);
    }

    private function normalizeAd(Ad $ad): array
    {
        return $this->normalizer->normalize($ad, null, [
            'groups' => ['ad:read'],
        ]);
    }

    public function recreateIndex(): void
    {
        if ($this->client->indices()->exists(['index' => self::INDEX])) {
            $this->client->indices()->delete(['index' => self::INDEX]);
        }

        $this->createIndex();
    }
}

