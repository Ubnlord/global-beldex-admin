# Global Beldex Admin Console

Separate, protected administration interface for Global Beldex.

## Security model

- Supabase Auth is the only browser authentication source.
- Administrator access is checked with the database `is_admin()` RPC.
- The browser uses only the Supabase publishable key.
- **Never** add `SUPABASE_SERVICE_ROLE_KEY`, a Supabase secret key, or other server secrets to this repository or frontend environment.
- User data is read through Supabase RLS.
- Financial mutations call PostgreSQL security-definer RPCs with explicit administrator permissions.
- Admin financial actions require a reason and are recorded by the database audit layer.
- The UI does not write directly to financial tables.

## Admin operations

Dashboard, user search/blocking, deposits, withdrawals, investments, transactions, and audit access are separated from the public Global Beldex website.

Financial RPCs used by the console include:

- `admin_fund_user`
- `admin_adjust_balance`
- `admin_approve_deposit`
- `admin_reject_deposit`
- `admin_approve_withdrawal`
- `admin_reject_withdrawal`
- `admin_manage_investment`
- `admin_set_user_block`

The production Supabase migration containing the new financial admin RPCs must be applied and verified before those controls are used against production data.

## Local development

1. Copy `.env.example` to `.env.local`.
2. Set the Supabase URL and publishable key.
3. Run `npm install`.
4. Run `npm run dev`.

GitHub Pages deployment uses the repository secret `SUPABASE_PUBLISHABLE_KEY`.
