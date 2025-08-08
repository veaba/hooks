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
PS F:\Github\veaba\hooks> $elapsed = Measure-Command {
>>     pnpm run rslib
>> }
>> Write-Host "pnpm run rslib: $($elapsed.TotalSeconds) seconds"
pnpm run rslib: 5.7699868 seconds
PS F:\Github\veaba\hooks> $elapsed = Measure-Command {
>>     pnpm run rslib
>> }
>> Write-Host "pnpm run rslib: $($elapsed.TotalSeconds) seconds"
pnpm run rslib: 5.9108516 seconds
PS F:\Github\veaba\hooks> 

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
pnpm run tsdown: 5.2645592 seconds
PS F:\Github\veaba\hooks> $elapsed = Measure-Command {
>>     pnpm run tsdown
>> }
>> Write-Host "pnpm run tsdown: $($elapsed.TotalSeconds) seconds"
pnpm run tsdown: 5.0445151 seconds
PS F:\Github\veaba\hooks> 


```
