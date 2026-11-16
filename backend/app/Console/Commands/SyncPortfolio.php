<?php

namespace App\Console\Commands;

use App\Models\Project;
use App\Models\Service;
use App\Models\Skill;
use App\Support\PortfolioCatalog;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SyncPortfolio extends Command
{
    protected $signature = 'portfolio:sync {--apply : Aplicar los cambios mostrados} {--overwrite : Reemplazar registros existentes del catálogo}';

    protected $description = 'Previsualiza o sincroniza el catálogo confirmado; no elimina registros ni contactos';

    public function handle(): int
    {
        $changes = [];
        foreach ([['projects', Project::class, 'title'], ['skills', Skill::class, 'name'], ['services', Service::class, 'title']] as [$section, $model, $field]) {
            foreach (PortfolioCatalog::section($section) as $item) {
                $record = isset($item['catalog_key']) ? $model::where('catalog_key', $item['catalog_key'])->first() : null;
                $record ??= $model::where($field, $item[$field])->first();
                $action = $record ? ($this->option('overwrite') ? 'REEMPLAZAR' : 'CONSERVAR') : 'CREAR';
                $this->line($section.' | '.$action.' | '.$item[$field]);
                if ($action !== 'CONSERVAR') {
                    $changes[] = [$model, $record, $item];
                }
            }
        }
        if (! $this->option('apply')) {
            $this->info('Solo vista previa. Respaldar y revisar la BD antes de --apply. --overwrite reemplaza ediciones existentes.');

            return self::SUCCESS;
        }
        DB::transaction(function () use ($changes) {
            foreach ($changes as [$model, $record, $item]) {
                if ($record) {
                    $record->fill($item)->save();
                } else {
                    $model::create($item);
                }
            }
        });
        $this->info('Catálogo sincronizado sin eliminar contactos ni registros ajenos al catálogo.');

        return self::SUCCESS;
    }
}
