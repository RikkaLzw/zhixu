import { expect, test } from '@playwright/test';

test('research details are optional and remain available for focused study', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.getByText('今天的学习')).toBeVisible();
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByLabel('搜索卡片').fill('Lastline 数据集公开性');
  const question = 'DeepCASE 作者的代码仓库对 Lastline 数据集公开性说明了什么？';
  await expect(page.getByText(question)).toHaveCount(0);
  await page.getByRole('button', { name: '学习范围：研究拓展' }).click();
  await expect(page.getByText(question)).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await expect(page.getByText(question)).toBeVisible();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText('由于保密协议，作者不能公开该数据集。')).toBeVisible();
  await page.getByRole('button', { name: '结束学习' }).click();
  await expect(page.getByText(question)).toBeVisible();
});

test('legacy full saves are migrated into compact storage without losing personal cards', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => {
    localStorage.clear();
    localStorage.setItem('@ai4sec-memory/v1', JSON.stringify({
      version: 1,
      contentRevision: 236,
      cards: [{ id: 'legacy-custom', category: 'foundations', question: '我的历史自建问题', answer: '我的历史答案', createdAt: 1 }],
      progress: {},
      history: [],
      deletedCardIds: ['sdp2-002'],
      settings: { dailyNewLimit: 25, userSetLimit: true },
    }));
  });
  await page.reload();
  await expect(page.getByText('今天的学习')).toBeVisible();
  await expect.poll(() => page.evaluate(() => {
    const raw = localStorage.getItem('@ai4sec-memory/v1');
    return raw ? JSON.parse(raw).storageFormat : null;
  })).toBe(2);
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByLabel('搜索卡片').fill('我的历史自建问题');
  await expect(page.getByText('我的历史答案')).toBeVisible();
  await page.reload();
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByLabel('搜索卡片').fill('我的历史自建问题');
  await expect(page.getByText('我的历史答案')).toBeVisible();
});

test('the early detection card explains the availability of features at prediction time', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByText('今天的学习')).toBeVisible();
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByLabel('搜索卡片').fill('CIC-IDS2017 的完整流统计为什么可能不适合早期检测');
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText('特征只能使用预测时已经可获得的信息；事后才形成的统计不能用于当时的预测。')).toBeVisible();
});
