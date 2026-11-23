import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.getByText('今天的学习')).toBeVisible();
});

test('enabled stages persist and limit the default study queue', async ({ page }) => {
  await page.getByRole('button', { name: '学习设置' }).click();
  const basic = page.getByRole('switch', { name: '启用基础阶段' });
  const advanced = page.getByRole('switch', { name: '启用进阶阶段' });
  const practice = page.getByRole('switch', { name: '启用实践阶段' });
  await expect(basic).toBeChecked();
  await expect(advanced).toBeChecked();
  await expect(practice).toBeChecked();
  await advanced.click();
  await practice.click();
  await page.getByRole('button', { name: '关闭设置' }).click();
  await page.reload();
  await page.getByRole('button', { name: '学习设置' }).click();
  await expect(basic).toBeChecked();
  await expect(advanced).not.toBeChecked();
  await expect(practice).not.toBeChecked();
  await page.getByRole('button', { name: '关闭设置' }).click();
  await page.getByRole('button', { name: '开始学习', exact: true }).click();
  await expect(page.getByText('有监督分类与异常检测的常见目标有什么区别？')).toBeVisible();
  await expect(page.getByText('基础 · 新知识')).toBeVisible();
});

test('a disabled stage can be browsed and enabled from the library', async ({ page }) => {
  await page.getByRole('button', { name: '学习设置' }).click();
  await page.getByRole('switch', { name: '启用进阶阶段' }).click();
  await page.getByRole('button', { name: '关闭设置' }).click();
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习阶段：进阶' }).click();
  await page.getByLabel('搜索卡片').fill('Tree of Thoughts 的步骤粒度');
  const question = '设计 Tree of Thoughts 的步骤粒度时，为什么不宜一味过大或过小？';
  await expect(page.getByText(question)).toBeVisible();
  await expect(page.getByRole('button', { name: '学习筛选结果' })).toBeDisabled();
  await page.getByRole('button', { name: '前往设置开启学习阶段' }).click();
  await page.getByRole('switch', { name: '启用进阶阶段' }).click();
  await page.getByRole('button', { name: '关闭设置' }).click();
  await expect(page.getByRole('button', { name: '学习筛选结果' })).toBeEnabled();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await expect(page.getByText(question)).toBeVisible();
});

test('studying a selected stage shows its name', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习阶段：基础' }).click();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await expect(page.getByText('基础阶段', { exact: true })).toBeVisible();
  await expect(page.getByText('基础 · 新知识')).toBeVisible();
});

test('the stage of an existing card can be changed without losing its source', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  const question = '常见 TCP 三次握手的报文顺序是什么？';
  await page.getByLabel('搜索卡片').fill(question);
  await page.getByRole('button', { name: `编辑卡片：${question}` }).click();
  await page.getByRole('button', { name: '卡片阶段：进阶' }).click();
  await page.getByRole('button', { name: '保存卡片' }).click();
  await page.getByRole('button', { name: '学习阶段：进阶' }).click();
  await expect(page.getByText(question)).toBeVisible();
  await page.reload();
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习阶段：进阶' }).click();
  await page.getByLabel('搜索卡片').fill(question);
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByLabel('TCP/IP 基础：RFC 9293、RFC 5681 和 RFC 768，原文依据')).toBeVisible();
});

test('all stages can be paused and resumed after a reload', async ({ page }) => {
  await page.getByRole('button', { name: '学习设置' }).click();
  for (const name of ['基础', '进阶', '实践']) {
    await page.getByRole('switch', { name: `启用${name}阶段` }).click();
  }
  await page.getByRole('button', { name: '关闭设置' }).click();
  await page.reload();
  await expect(page.getByText('请在学习设置中开启至少一个阶段')).toBeVisible();
  await expect(page.getByRole('button', { name: '开始学习', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: '学习设置' }).click();
  await page.getByRole('switch', { name: '启用基础阶段' }).click();
  await page.getByRole('button', { name: '关闭设置' }).click();
  await expect(page.getByRole('button', { name: '开始学习', exact: true })).toBeEnabled();
});

test('a new card can be assigned a stage and found after a reload', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '添加卡片' }).click();
  await page.getByRole('button', { name: '卡片阶段：实践' }).click();
  await page.getByLabel('卡片问题').fill('我的实践卡片');
  await page.getByLabel('卡片答案').fill('我的实践答案');
  await page.getByRole('button', { name: '保存卡片' }).click();
  await page.reload();
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '学习阶段：实践' }).click();
  await page.getByLabel('搜索卡片').fill('我的实践卡片');
  await expect(page.getByText('我的实践卡片')).toBeVisible();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await expect(page.getByText('实践 · 新知识')).toBeVisible();
});
