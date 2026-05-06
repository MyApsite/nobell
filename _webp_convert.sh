#!/bin/bash
# Convert all PNG/JPG to WebP in folders without existing webp.
# Quality 85 is the sweet spot for photos (visually identical to original at ~15-25% size).

cd "$(dirname "$0")"

converted=0
skipped=0
failed=0

# Folders that need conversion (have png/jpg but no webp). Excluding "Новая папка" (cyrillic, already partial).
FOLDERS=(
  app arnold-son-constance aroeira-missoni artmonte-carlo bishops-avenue
  breguet-experimentale bulgari-lighthouse bulgari-monete bulgari-tubogas
  calendar chopard-imperiale concorso-villa-deste dubai-beach-edition
  hermes-arceau hublot-big-bang la-guerite-cannes limassol-blu-marine
  louis-vuitton-escale maison-margiela met-gala miraval-red-sea
  mr-c-residences patek-5308 patek-aquanaut-luce patek-rainbow
  prime-residences rocco-forte-villas roger-dubuis-hommage shellona-saint-tropez
  the-rings top-marques-monaco tyrian-residences watches waterfront-di-levante
  world-superyacht-awards
)

for dir in "${FOLDERS[@]}"; do
  src_dir="assets/images/$dir"
  [ -d "$src_dir" ] || { echo "MISS: $src_dir"; continue; }

  for src in "$src_dir"/*.png "$src_dir"/*.jpg "$src_dir"/*.jpeg; do
    [ -f "$src" ] || continue
    base="${src%.*}"
    target="${base}.webp"

    if [ -f "$target" ]; then
      skipped=$((skipped+1))
      continue
    fi

    # ffmpeg: -y overwrite, -i input, -c:v libwebp, -quality 85, -compression_level 4
    if ffmpeg -y -i "$src" -c:v libwebp -quality 85 -compression_level 4 "$target" </dev/null >/dev/null 2>&1; then
      orig_kb=$(du -k "$src" | cut -f1)
      new_kb=$(du -k "$target" | cut -f1)
      printf "[OK] %-50s %5d -> %5d KB\n" "${src#assets/images/}" "$orig_kb" "$new_kb"
      converted=$((converted+1))
    else
      echo "[FAIL] $src"
      failed=$((failed+1))
    fi
  done
done

echo ""
echo "=== converted: $converted, skipped: $skipped, failed: $failed ==="
