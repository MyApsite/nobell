#!/bin/bash
# SEO audit — runs locally on e:/GitHub/nobell, equivalent to prod after FTP sync.
# Reports only ISSUES per page.

cd "$(dirname "$0")"
issues_total=0
pages_with_issues=0

# Pages to skip (legacy/backup, not on sitemap)
SKIP_RE='recommendation-(original|server)(\.local-backup)?\.html'

for f in *.html; do
  [[ "$f" =~ $SKIP_RE ]] && continue

  page_issues=()
  content=$(cat "$f")

  # 1. <title>
  title=$(echo "$content" | grep -oP '<title>\K[^<]+' | head -1)
  [[ -z "$title" ]] && page_issues+=("missing <title>")
  [[ ${#title} -gt 90 ]] && page_issues+=("title too long (${#title} chars)")
  [[ ${#title} -lt 10 && -n "$title" ]] && page_issues+=("title too short (${#title} chars): '$title'")

  # 2. meta description
  desc=$(echo "$content" | grep -oP 'name="description"\s+content="\K[^"]+' | head -1)
  [[ -z "$desc" ]] && page_issues+=("missing meta description")
  [[ ${#desc} -gt 200 ]] && page_issues+=("description too long (${#desc} chars)")
  [[ ${#desc} -lt 50 && -n "$desc" ]] && page_issues+=("description too short (${#desc} chars)")

  # 3. canonical
  canon=$(echo "$content" | grep -oP 'rel="canonical"\s+href="\K[^"]+' | head -1)
  [[ -z "$canon" ]] && page_issues+=("missing rel=canonical")
  expected_canon="https://nobell.com/$f"
  [[ -n "$canon" && "$canon" != "$expected_canon" ]] && page_issues+=("canonical mismatch: $canon ≠ $expected_canon")

  # 4. og:url
  ogurl=$(echo "$content" | grep -oP 'property="og:url"\s+content="\K[^"]+' | head -1)
  [[ -z "$ogurl" ]] && page_issues+=("missing og:url")
  [[ -n "$ogurl" && "$ogurl" != "$expected_canon" ]] && page_issues+=("og:url mismatch: $ogurl ≠ $expected_canon")

  # 5. og:image
  ogimg=$(echo "$content" | grep -oP 'property="og:image"\s+content="\K[^"]+' | head -1)
  [[ -z "$ogimg" ]] && page_issues+=("missing og:image")

  # 6. og:title, og:description, twitter:card
  echo "$content" | grep -q 'property="og:title"' || page_issues+=("missing og:title")
  echo "$content" | grep -q 'property="og:description"' || page_issues+=("missing og:description")
  echo "$content" | grep -q 'name="twitter:card"' || page_issues+=("missing twitter:card")

  # 7. <html lang="...">
  lang=$(echo "$content" | grep -oP '<html\s+lang="\K[^"]+' | head -1)
  [[ -z "$lang" ]] && page_issues+=("missing lang attr on <html>")

  # 8. h1
  h1_count=$(echo "$content" | grep -oc '<h1' | head -1)
  [[ "$h1_count" == "0" ]] && page_issues+=("no <h1>")
  [[ "$h1_count" -gt 1 ]] && page_issues+=("multiple <h1> ($h1_count)")

  # 9. images without alt
  no_alt=$(echo "$content" | grep -E '<img\s' | grep -vc 'alt=')
  [[ "$no_alt" -gt 0 ]] && page_issues+=("$no_alt <img> without alt=")

  if [[ ${#page_issues[@]} -gt 0 ]]; then
    echo ""
    echo "=== $f ==="
    for i in "${page_issues[@]}"; do
      echo "  - $i"
      issues_total=$((issues_total+1))
    done
    pages_with_issues=$((pages_with_issues+1))
  fi
done

echo ""
echo "==================="
echo "Total: $pages_with_issues pages with $issues_total issues"
