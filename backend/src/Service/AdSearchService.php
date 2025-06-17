<?php

namespace App\Service;

use Elastic\Elasticsearch\Client;

class AdSearchService
{
    public function __construct(
        private OpenAiElasticQueryGenerator $queryGenerator,
        private Client $elasticsearch,
    ) {}

    public function search(string $phrase): array
    {
        $query = $this->queryGenerator->generateQuery($phrase);

        $response = $this->elasticsearch->search([
            'index' => 'ads',
            'body' => $query,
        ]);

        return array_map(fn($hit) => $hit['_source'], $response->asArray()['hits']['hits']);
    }
}
