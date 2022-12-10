export const DEPOSITS_BY_MONTH = `
SELECT
  SUM(CAST(params[3].value as FLOAT(38,0))) / POW(10, 18) AS total_sum,
  EXTRACT(MONTH FROM t.timestamp) AS transaction_month
FROM
  usery76xn3t.transaction_log t
WHERE
  t.transaction_to = '0xd3b5d9a561c293fb42b446fe7e237daa9bf9aa84'
  AND t.name = 'Transfer'
  AND t.transaction_function_name = 'deposit'
GROUP BY
  EXTRACT(MONTH FROM t.timestamp)
`

export const WITHDRAWS_BY_MONTH = `
SELECT
  SUM(CAST(params[3].value as FLOAT(38,0))) / POW(10, 18) AS total_sum,
  EXTRACT(MONTH FROM t.timestamp) AS transaction_month
FROM
  usery76xn3t.transaction_log t
WHERE
  t.transaction_to = '0xd3b5d9a561c293fb42b446fe7e237daa9bf9aa84'
  AND t.name = 'Transfer'
  AND t.transaction_function_name = 'withdraw'
GROUP BY
  EXTRACT(MONTH FROM t.timestamp)
`