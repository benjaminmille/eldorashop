<?php


namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class OpenAiElasticQueryGenerator
{
    public function __construct(
        private HttpClientInterface $httpClient,
        private string $openaiApiKey,
    ) {}

    public function generateQuery(string $phrase): array
    {
        $response = $this->httpClient->request('POST', 'https://api.openai.com/v1/chat/completions', [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->openaiApiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    [
                        'role' => 'system',
                        'content' => "Tu génères uniquement une requête Elasticsearch JSON à partir d’une phrase utilisateur, en te basant sur ces champs : title, description, price, location, isAvailable, category, owner, createdAt. Ne renvoie que du JSON brut."
                    ],
                    [
                        'role' => 'user',
                        'content' => $phrase
                    ]
                ],
                'temperature' => 0.2,
            ]
        ]);

        $json = $response->toArray()['choices'][0]['message']['content'];

        return json_decode($json, true);
    }
}
