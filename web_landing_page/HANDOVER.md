# HANDOVER: Netlify Configuration Update

> [!IMPORTANT]
> **CRITICAL ACTION REQUIRED AFTER MERGE**

Due to the repository restructuring, the build settings in Netlify must be updated to reflect the new file paths. Failure to do so will result in deployment errors ("Page Not Found").

## 1. Update Publish Directory
Currently, Netlify looks for `deploy/`.
You must change this to:
`web_landing_page/deploy/`

**Steps:**
1. Go to Netlify Dashboard -> **Site Configuration**.
2. Select **Build & deploy** -> **Continuous Deployment**.
3. In **Build settings**, click **Edit settings**.
4. Update **Publish directory**:
   - Old: `deploy/`
   - New: `web_landing_page/deploy/`
5. Click **Save**.

## 2. Trigger New Deploy
After saving, you must manually trigger a deploy to apply the changes:
1. Go to **Deploys**.
2. Click **Trigger deploy** -> **Deploy site**.

## 3. Verify
Check the live URL. If you see the SPARK landing page, the configuration is correct.
