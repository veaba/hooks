# veaba/hooks

原仓库地址：<https://github.com/alibaba/hooks>

> 本项目为 [veaba/hooks](veaba/hooks) fork for [alibaba/hooks](alibaba/hooks)，使用现代流行的构件工具库重构，以获得开发体验，仅限于个人学习项目。

## 基本命令

### 构建命令

rslib 构建：

```shell
# 执行 rslib 构建，产物会在 packages/hooks 中生成  dist-rslib 目录下
pnpm run rslib
```

tsdown 构建：

```shell
# 执行 tsdown 构建，产物会在 packages/hooks 中生成  dist-tsdown 目录下
pnpm run tsdown
```

### rslib 配置

详见：[rslib.config.ts](packages/hooks/rslib.config.ts)

> 为了方便对照，产物的父级目录是 `dist-rslib`

- 会输出三份产物

  - dist unpkg umd 格式，对比了下，发现差异有点大，不太确认是正确的生成
  - es，dts 生成
  - lib，无 dts 生成

### tsdown 配置

详见：[tsdown.config.ts](packages/hooks/tsdown.config.ts)

> 为了方便对照，产物的父级目录是 `dist-tsdown`

- 会输出三份产物

  - dist unpkg umd 格式，对比了下，发现差异有点大，不太确认是正确的生成
  - es，dts 生成
  - lib，无 dts

### 在 PS1 中测试结果

> 注，因配置差异，和 dist 产物 未能最终确认，仅作为一个参考，请勿视为实际测试结果

rslib:

```powershell
$elapsed = Measure-Command {
    pnpm run rslib
}
Write-Host "pnpm run rslib: $($elapsed.TotalSeconds) seconds"
```

result:

```shell
PS F:\Github\veaba\hooks>
PS F:\Github\veaba\hooks> $elapsed = Measure-Command {
>>     pnpm run rslib
>> }
>> Write-Host "pnpm run rslib: $($elapsed.TotalSeconds) seconds"
pnpm run rslib: 6.8548657 seconds
PS F:\Github\veaba\hooks> $elapsed = Measure-Command {
>>     pnpm run rslib
>> }
>> Write-Host "pnpm run rslib: $($elapsed.TotalSeconds) seconds"
pnpm run rslib: 6.0055375 seconds

```

tsdown:

```powershell
$elapsed = Measure-Command {
    pnpm run tsdown
}
Write-Host "pnpm run tsdown: $($elapsed.TotalSeconds) seconds"
```

result:

```shell
PS F:\Github\veaba\hooks> $elapsed = Measure-Command {
>>     pnpm run tsdown
>> }
>> Write-Host "pnpm run tsdown: $($elapsed.TotalSeconds) seconds"
pnpm run tsdown: 5.8085162 seconds
PS F:\Github\veaba\hooks> $elapsed = Measure-Command {
>>     pnpm run tsdown
>> }
>> Write-Host "pnpm run tsdown: $($elapsed.TotalSeconds) seconds"
pnpm run tsdown: 5.7541112 seconds
```

### 产物结构

请在此查看：

- [npm.log](tests/npm.log)
- [rslib.log](tests/rslib.log)
- [tsdown.log](tests/tsdown.log)

### 对比讨论

- [语雀-基于 ahooks 的库打包工具升级探讨，详细对比了 rslib 与 tsdown 的表现](<https://www.yuque.com/veaba/mslv25/oq9e42da8nnwbzms?singleDoc#>)
