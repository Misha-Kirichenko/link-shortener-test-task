export const SHORT_LINK_INFO_QUERY = `
        SELECT 
          sl.original_url AS "originalUrl", 
          (sl.created_at::double precision * 1000)::double precision AS "createdAt",
          (CASE 
            WHEN sl.expires_at IS NULL THEN NULL 
            ELSE (sl.expires_at::double precision * 1000)::double precision
          END) AS "expiresAt",
          (SELECT COUNT(cl.id)::double precision FROM clicks cl WHERE cl.short_link_id = sl.id) AS "clickCount"
        FROM short_links sl 
        WHERE sl.alias = $1
  `;

export const SHORT_LINK_ANALYTICS = `
  SELECT
  (
    SELECT COUNT(*)::double precision
    FROM clicks cl 
    WHERE cl.short_link_id = sl.id
  ) AS "clickCount",

  (
    SELECT json_agg(cl.ip) 
        FROM (
          SELECT cl.ip 
          FROM clicks cl 
          WHERE cl.short_link_id = sl.id 
          ORDER BY cl.created_at DESC 
          LIMIT 5
        ) cl
      ) AS "lastIps"

    FROM short_links sl
    WHERE sl.alias = $1;
  `;

export const SHORT_URL_LIST_QUERY = `
  SELECT sl.alias, CONCAT($1::text, ':', $2::text, '/', sl.alias) AS "shortUrl"
  FROM short_links sl`;
