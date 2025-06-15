<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

final class TestController extends AbstractController
{
    #[Route('/api/test', name: 'api_test')]
    public function index(): JsonResponse
    {
        return $this->json(['message' => 'Symfony fonctionne']);
    }
}
