<?php

namespace App\Command;

use App\Repository\AdRepository;
use App\Service\AdIndexer;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;

#[AsCommand(
    name: 'ads:reindex',
    description: 'Réindexe toutes les annonces dans Elasticsearch',
)]
class ReindexAdsCommand extends Command
{
    public function __construct(
        private readonly AdRepository $adRepository,
        private readonly AdIndexer $adIndexer
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $io->title('🔄 Réindexation des annonces');

        // Étape 1 : recréer l’index
        $this->adIndexer->createIndex(); // on utilise recreateIndex ici (voir ci-dessous)

        $ads = $this->adRepository->findAll();

        if (empty($ads)) {
            $io->warning('Aucune annonce à indexer.');
            return Command::SUCCESS;
        }

        $count = 0;

        foreach ($ads as $ad) {
            $this->adIndexer->indexAd($ad);
            $count++;
        }

        $io->success("✅ $count annonce(s) réindexée(s) avec succès.");

        return Command::SUCCESS;
    }
}
