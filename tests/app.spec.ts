import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => localStorage.clear());
  await page.reload();
  await expect(page.getByText('今天的学习')).toBeVisible();
});

test('study a card, record its rating and retain progress after reload', async ({ page }) => {
  await page.screenshot({ path: 'test-results/home.png' });
  await page.getByRole('button', { name: '开始学习', exact: true }).click();
  await expect(page.getByText('AI4SEC 中的分类和异常检测有什么区别？')).toBeVisible();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText('分类利用已标注样本学习已知类别', { exact: false })).toBeVisible();
  await page.screenshot({ path: 'test-results/study.png' });
  await page.getByRole('button', { name: '记得，1 天后复习' }).click();
  await expect(page.getByText('安全检测中的标签泄漏是什么？')).toBeVisible();
  await page.getByRole('button', { name: '结束学习' }).click();
  await expect(page.getByText('今日学习次数')).toBeVisible();
  await page.reload();
  await page.getByRole('tab', { name: '进度' }).click();
  await expect(page.getByText('长期复习')).toBeVisible();
  await expect(page.getByText('累计学习')).toBeVisible();
  await expect(page.getByText('1 次', { exact: false }).first()).toBeVisible();
});

test('create, search, edit and delete an individual card', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.getByRole('button', { name: '添加卡片' }).click();
  await page.getByLabel('卡片问题').fill('如何评估告警排序？');
  await page.getByLabel('卡片答案').fill('查看高优先级告警中的真实威胁比例。');
  await page.getByRole('button', { name: '保存卡片' }).click();
  await page.getByLabel('搜索卡片').fill('如何评估告警排序？');
  await expect(page.getByText('如何评估告警排序？')).toBeVisible();
  await page.getByRole('button', { name: '编辑卡片：如何评估告警排序？' }).click();
  await page.getByLabel('卡片答案').fill('结合真实威胁比例和分析人员处理量。');
  await page.getByRole('button', { name: '保存卡片' }).click();
  await expect(page.getByText('结合真实威胁比例和分析人员处理量。')).toBeVisible();
  await page.getByRole('button', { name: '删除卡片：如何评估告警排序？' }).click();
  await page.getByRole('button', { name: '确认删除' }).click();
  await expect(page.getByText('这里还没有卡片')).toBeVisible();
});

test('daily new-card limit persists', async ({ page }) => {
  await page.getByRole('button', { name: '学习设置' }).click();
  await page.screenshot({ path: 'test-results/settings.png' });
  const input = page.getByRole('textbox', { name: '每日新卡数量' });
  await expect(input).toHaveValue('500');
  await input.fill('5000');
  await page.getByRole('button', { name: '保存每日新卡数量' }).click();
  await page.getByRole('button', { name: '关闭设置' }).click();
  await page.reload();
  await page.getByRole('button', { name: '学习设置' }).click();
  await expect(page.getByRole('textbox', { name: '每日新卡数量' })).toHaveValue('5000');
  await page.getByRole('textbox', { name: '每日新卡数量' }).fill('5001');
  await page.getByRole('button', { name: '保存每日新卡数量' }).click();
  await expect(page.getByText('请输入 0～5000 之间的整数。')).toBeVisible();
  await page.reload();
  await page.getByRole('button', { name: '学习设置' }).click();
  await expect(page.getByRole('textbox', { name: '每日新卡数量' })).toHaveValue('5000');
});

test('filter by source and study a matching card with provenance', async ({ page }) => {
  await page.getByRole('tab', { name: '题库' }).click();
  await page.screenshot({ path: 'test-results/library.png' });
  await page.getByRole('button', { name: '来源：CIC-IDS2017' }).click();
  await page.getByRole('button', { name: '学习筛选结果' }).click();
  await page.getByRole('button', { name: '显示答案' }).click();
  await expect(page.getByText('参考来源')).toBeVisible();
  await expect(page.getByLabel(/CIC-IDS2017 官方数据集/)).toBeVisible();
});
