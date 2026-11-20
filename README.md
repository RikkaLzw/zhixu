# 知序 AI4SEC

知序是一款面向 AI4SEC 学习的离线安卓卡片应用。当前内置 198 张卡片，支持按方向、主题、来源和关键词查找，也可以自建和编辑卡片。题库将继续扩充 AI、Agent 基础及 AI 赋能安全的知识。

## 功能

- 到期卡片优先复习；每日新卡默认上限为 500 张，可直接输入 0～5000。
- 根据「忘记、模糊、记得、简单」调整短期巩固和长期复习间隔。
- 题库按方向、主题、标签和来源组织；合并同一知识点时保留相关问法、例子和来源。
- 展示学习进度、连续学习天数，并支持添加、编辑和删除卡片。
- 学习数据保存在设备本地，升级时保留已有进度和自定义卡片。

## 项目结构

```text
.
├── App.tsx                  # 应用入口、页面切换
├── app.json                 # Expo 与安卓构建配置
├── assets/                  # 图标及其原始素材
├── docs/                    # AI4SEC 技术路线
├── question-banks/          # 分来源题库、去重规则和标准化导出
│   ├── README.md            # 题库格式、来源索引和增库流程
│   ├── 万题集知识范围.md    # 可持续扩充的知识范围
│   └── normalized/          # 合并后的 JSON 和 Anki 文本导出
├── src/
│   ├── data/                # 题库注册、标准化和数据迁移
│   ├── lib/                 # 间隔复习及筛选逻辑
│   ├── screens/             # 学习、题库、设置和进度页面
│   └── components/          # 通用界面组件
├── tests/                   # 调度、迁移、题库和界面测试
├── tools/                   # 题库检查、导出和图标生成
└── .github/workflows/       # 自动检查
```

## 安装与运行

需要 Node.js 22.13 及以上的受支持版本；项目提供 `.nvmrc`。克隆后安装锁定的依赖：

```bash
git clone https://github.com/RikkaLzw/zhixu.git
cd zhixu
npm ci
npm start
```

使用与项目 SDK 版本相匹配的 Expo Go 扫描终端二维码，在安卓手机上运行。手机与开发机需要能够访问同一个开发服务器。

若手机通过 ADB 连接，且开发服务器使用默认端口 8081，可以执行：

```bash
adb reverse tcp:8081 tcp:8081
adb shell am start -a android.intent.action.VIEW -d "exp://127.0.0.1:8081"
```

## 安卓构建

构建独立 APK 需要 Java、Android SDK、NDK 与 CMake。项目的 Android 配置使用 compile SDK 37、target SDK 36、NDK 27.1.12297006 和 CMake 3.31.6；本地构建时由 Android 构建工具检查所需组件。

```bash
npx expo prebuild --platform android
cd android
```

在 Windows 上运行 `.\gradlew.bat assembleRelease`；在 macOS 或 Linux 上运行 `./gradlew assembleRelease`。APK 位于 `android/app/build/outputs/apk/release/app-release.apk`。当前使用开发签名，正式分发前需配置自己的签名。

原生目录、安装包、SDK 缓存和签名材料不提交到仓库；克隆后可根据上述命令重新生成。设备本地数据不会随仓库同步，卸载应用会清除本地记录。

## 题库维护

阅读 [题库来源与维护说明](question-banks/README.md) 和 [万题集知识范围](question-banks/万题集知识范围.md)。新增资料时，在 `question-banks/` 建立来源目录并登记卡片；检查相似知识点、维护合并规则，最后重新导出标准化文件。

```bash
npm run check:banks -- --candidates --threshold=0.55
npm run export:banks
```

导出的 [标准 JSON](question-banks/normalized/cards.json) 和 [Anki 文本文件](question-banks/normalized/anki-import.tsv) 随源码一起提交。新增内置题库时，需要按题库维护说明更新内容版本和迁移逻辑，以保留已有进度。

## 检查

```bash
npm run typecheck
npm test
npm run check:banks
npx playwright install chromium
npm run test:ui
```

界面测试默认使用 Playwright 安装的 Chromium。若要使用本机 Chrome，可将 `PLAYWRIGHT_BROWSER_CHANNEL` 设为 `chrome` 后运行 `npm run test:ui`。GitHub Actions 会检查类型、测试、题库及导出文件的一致性。

## 资料与许可

[AI4SEC 技术路线](docs/技术路线.md) 和题库目录记录了学习范围与来源。仓库根目录的 `LICENSE` 是初始化时随 Expo 模板提供的许可文本；题库所引用的资料仍需遵守各自的许可与署名要求。
