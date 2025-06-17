<?php


namespace App\Factory;

use Elastic\Elasticsearch\Client;
use Elastic\Elasticsearch\ClientBuilder;

class ElasticsearchClientFactory
{
    public static function create(): Client
    {
        return ClientBuilder::create()
            ->setHosts([$_ENV['ELASTICSEARCH_HOST'] ?? 'http://localhost:9200']) // adapte selon ton .env
            ->build();
    }
}
