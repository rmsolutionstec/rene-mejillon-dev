<?php

namespace App\Support;

final class PortfolioCatalog
{
    public static function seed(string $model, string $section, string $naturalKey): void
    {
        foreach (self::section($section) as $item) {
            $identity = ['catalog_key' => $item['catalog_key']];
            if ($model::where($identity)->exists()) {
                continue;
            }
            $legacy = $model::where($naturalKey, $item[$naturalKey])->whereNull('catalog_key')->first();
            if ($legacy) {
                // Adopt a stable identity only; retain its content and publication decision.
                $legacy->update($identity);

                continue;
            }
            $model::firstOrCreate($identity, $item);
        }
    }

    public static function section(string $section): array
    {
        return json_decode(file_get_contents(resource_path('portfolio.json')), true, 512, JSON_THROW_ON_ERROR)[$section];
    }
}
