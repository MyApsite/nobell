{# Schema.org JSON-LD: Organization + BreadcrumbList + per-page type. #}
  <script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://nobell.com#organization",
      "name": "Nobell",
      "url": "https://nobell.com",
      "logo": "https://nobell.com/assets/images/logo.svg",
      "sameAs": [
        "https://instagram.com/nobell",
        "https://twitter.com/nobell",
        "https://facebook.com/nobell",
        "https://youtube.com/@nobell"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://nobell.com#website",
      "url": "https://nobell.com",
      "name": "Nobell",
      "publisher": {"@id": "https://nobell.com#organization"},
      "inLanguage": "ru-RU",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://nobell.com/search.html?s={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": "{{ page.canonical }}#breadcrumb",
      "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Главная", "item": "https://nobell.com/"}
        {%- if not category_only %},
        {"@type": "ListItem", "position": 2, "name": "{{ category_label }}", "item": "https://nobell.com/{{ category_href }}"}
        {%- set pos = namespace(n=3) %}
        {%- for c in crumbs %},
        {"@type": "ListItem", "position": {{ pos.n }}, "name": "{{ c.label }}"{% if c.href %}, "item": "https://nobell.com/{{ c.href }}"{% endif %}}
        {%- set pos.n = pos.n + 1 %}
        {%- endfor %}
        {%- else %},
        {"@type": "ListItem", "position": 2, "name": "{{ category_label }}", "item": "https://nobell.com/{{ category_href }}"}
        {%- endif %}
      ]
    }
    {%- if category_only %},
    {
      "@type": "CollectionPage",
      "@id": "{{ page.canonical }}#collection",
      "url": "{{ page.canonical }}",
      "name": "{{ page.title }}",
      "description": "{{ page.description }}",
      "image": "{{ page.og_image }}",
      "inLanguage": "ru-RU",
      "isPartOf": {"@id": "https://nobell.com#website"},
      "breadcrumb": {"@id": "{{ page.canonical }}#breadcrumb"},
      "mainEntity": {
        "@type": "ItemList",
        "numberOfItems": {{ items|length }},
        "itemListElement": [
          {%- for s in items %}
          {"@type": "ListItem", "position": {{ loop.index }}, "url": "https://nobell.com/{{ s.slug }}.html", "name": "{{ s.card.card_title|e }}", "image": "https://nobell.com/{{ s.card.card_image_base }}.{{ s.card.card_image_ext }}"}{% if not loop.last %},{% endif %}
          {%- endfor %}
        ]
      }
    }
    {%- else %},
    {
      "@type": "Article",
      "@id": "{{ page.canonical }}#article",
      "url": "{{ page.canonical }}",
      "headline": "{{ page.h1 }}",
      "description": "{{ page.description }}",
      "image": "{{ page.og_image }}",
      "inLanguage": "ru-RU",
      "isPartOf": {"@id": "https://nobell.com#website"},
      "publisher": {"@id": "https://nobell.com#organization"},
      "breadcrumb": {"@id": "{{ page.canonical }}#breadcrumb"},
      "mainEntityOfPage": "{{ page.canonical }}",
      "articleSection": "{{ category_label }}"
      {%- if page.tags %},
      "keywords": [{% for t in page.tags %}"{{ t.label|e }}"{% if not loop.last %}, {% endif %}{% endfor %}]
      {%- endif %}
    }
    {%- endif %}
  ]
}
  </script>
