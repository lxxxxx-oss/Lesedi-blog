---
title: PyTorch 基础
category: Python
tags: [PyTorch]
pubDate: 2026-06-17
description: PyTorch核心概念与实践，涵盖环境配置、数据预处理、TensorBoard可视化与Transforms
source: Pytorch.md
---

# PyTorch 基础

## 环境配置与基础命令

在 Anaconda prompt 中新建虚拟环境：

```bash
conda create --name my_github_env
```

在 Anaconda prompt 中切换虚拟环境：

```bash
conda activate 虚拟环境名
```

启动 Jupyter：

```bash
jupyter notebook
```

验证是否成功安装环境：

```python
import torch
torch.cuda.is_available()
# 打印 true，代表环境安装成功
```

用 conda 环境安装 requirements.txt 里面的依赖：

```bash
conda install --file requirements.txt
```

## 数据预处理

为了能用深度学习来解决现实世界的问题，我们经常从预处理原始数据开始，而不是从那些准备好的张量格式数据开始。在 Python 中常用的数据分析工具中，我们通常使用 **pandas** 软件包。像庞大的 Python 生态系统中的许多其他扩展包一样，**pandas** 可以与张量兼容。

### pandas

pandas 可以让我们轻松地处理各种数据结构，尤其是**表格型数据**，如 SQL 数据库或 Excel 表格，pandas 可以与张量兼容。

pandas 提供了丰富的功能，包括：

- **数据清洗**：处理缺失数据、重复数据等。
- **数据转换**：改变数据的形状、结构或格式。
- **数据分析**：进行统计分析、聚合、分组等。
- **数据可视化**：通过整合 Matplotlib 和 Seaborn 等库，可以进行数据可视化。

### 读取数据

举一个例子，我们首先创建一个人工数据集，并存储在 CSV（逗号分隔值）文件 `../data/house_tiny.csv` 中。以其他格式存储的数据也可以通过类似的方式进行处理。下面我们将数据集按行写入 CSV 文件中。

```python
# 创建一个名为 data 的目录（如果它不存在）。
# 在该目录下创建一个名为 house_tiny.csv 的文件，并向其中写入房屋信息的 CSV 数据，包括列名和四条记录。
import os

os.makedirs(os.path.join('..', 'data'), exist_ok=True)
data_file = os.path.join('..', 'data', 'house_tiny.csv')
with open(data_file, 'w') as f:
    f.write('NumRooms,Alley,Price\n')  # 列名
    f.write('NA,Pave,127500\n')         # 每行表示一个数据样本
    f.write('2,NA,106000\n')
    f.write('4,NA,178100\n')
    f.write('NA,NA,140000\n')
```

```python
# 从 house_tiny.csv 文件中读取数据，并将其存储为一个 DataFrame，以便后续操作和分析。
# DataFrame 是一种类似于表格的二维数据结构，它可以存储数据并提供方便的数据操作和分析功能。
import pandas as pd
data = pd.read_csv(data_file)
print(data)
```

### 处理缺失值

注意，"NaN"项代表缺失值。为了处理缺失的数据，典型的方法包括插值法和删除法，其中插值法用一个替代值弥补缺失值，而删除法则直接忽略缺失值。在这里，我们将考虑插值法。

```python
# 从 data 中提取前两列作为 inputs，第三列作为 outputs。
# 对 inputs 中的数值列（即 NumRooms）进行缺失值处理，将缺失值替换为该列的平均值，
# 而文本列（Alley）中的缺失值保持不变。因为 mean 函数无法处理文本值。
# 最后将处理后的 inputs 数据框打印出来。

inputs, outputs = data.iloc[:, 0:2], data.iloc[:, 2]
inputs = inputs.fillna(inputs.mean(numeric_only=True))
print(inputs)
```

```python
# get_dummies 用于将分类数据（如文本类别）转换为一个或多个二进制（0/1）列。
# 这个过程叫做"独热编码"（One-Hot Encoding）
inputs = pd.get_dummies(inputs, dummy_na=True)
print(inputs)

# 这行代码将 inputs 数据框中的分类数据（如文本或缺失值）转换为多个二进制列（独热编码），
# 使其适合于机器学习模型。dummy_na=True 参数确保缺失值也被处理，生成一个专门表示缺失值的列。
```

### 转换为张量格式

现在 inputs 和 outputs 中的所有条目都是**数值类型**，它们可以转换为**张量格式**。当数据是张量格式时，即可引入张量函数进行进一步的操作。这也是 PyTorch 中最为特色的一部分，**PyTorch 对数据进行模型训练或者计算的前提就是数据得是张量格式**。张量支持自动微分、GPU 加速等功能，这是在神经网络训练中的核心。

```python
import torch
# inputs.values 和 outputs.values 是将 Pandas DataFrame inputs 和 outputs 中的数据提取为 NumPy 数组。
# 这是因为 PyTorch 的 tensor 函数接受的是 NumPy 数组或者 Python 的 list，而不是直接接受 Pandas DataFrame。
# torch.tensor() 是 PyTorch 的函数，它将 NumPy 数组或其他可迭代对象转换为 PyTorch 张量（tensor），
# 这是 PyTorch 用于高效数值计算的核心数据结构。
X, y = torch.tensor(inputs.values), torch.tensor(outputs.values)
X, y
```

## TensorBoard

**TensorBoard** 是一组用于数据可视化的工具，它包含在流行的开源机器学习库 **TensorFlow** 中。

### 启动 TensorBoard

```bash
# directory_name 是 log 文件所在的父文件夹的名字
tensorboard --logdir=<directory_name>
# 示例：tensorboard --logdir=logs
# 要先运行写好代码的 py 文件
# 运行成功，即会进入一个绘制好图像的网址，绘制的图像由 SummaryWriter 类控制
```

### SummaryWriter 类的使用

```python
# 图像相关文件会被写入 logs 文件夹
writer = SummaryWriter("logs")
# 绘制图像，第一个参数表示图像的名称、然后是 x 轴、y 轴
writer.add_scalar(参数1, 参数2, 参数3...)
```

### add_image 的使用

```python
# add_image 对图片类型和形状有严格要求，只有符合要求的图片才能使用，
# 如 torch.Tensor, numpy.ndarray, or string/blobname
# 这就涉及到利用 numpy.array(), 把 PIL 图片转换成 numpy 型
# 引用原始类型的图片

image_path = "data/train/ants_image/0013035.jpg"
img_PIL = Image.open(image_path)

# 利用 numpy.array() 转换图片类型为 numpy
img_numpy = np.array(img_PIL)

# 对于形状在参数列表进行设置即可，如 dataformats='HWC'
writer.add_image("test", img_numpy, 1, dataformats='HWC')
# 对于第三个参数"1"，可以看作是步数，当有第二个图片时可以将其设置为"2"，以此类推
```

## torchvision 中的 Transforms

torchvision 独立于 PyTorch，**专门用来处理图像**，通常用于计算机视觉领域。

### 安装 torchvision

```bash
pip install torchvision
```

### torchvision 最常用的三个包

**models**：提供了很多训练好的**网络模型**，我们可以直接加载并使用，如 AlexNet、ResNet 等。

**datasets**：提供了（1）一些常用的图片数据集，如 MNIST、COCO 等（2）加载自己的数据集的常用方法，目前只有 DatasetFolder、ImageFolder、VisionDataset 三个方法。

**transforms**：提供了一些常用的图像转换处理操作，主要针对 Tensor 或 PIL Image 进行操作。

### Transforms 的使用

```python
from torch.utils.tensorboard import SummaryWriter
from torchvision import transforms
from PIL import Image

# Tensor 数据类型
# 通过 transforms.ToTensor 去解决两个问题
# 1、transforms 该如何使用
# 2、为什么我们需要 Tensor 数据类型 ---> 这种数据类型有许多神经网络专用的变量，方便进行神经网络相关研究

img_path = "data/train/ants_image/0013035.jpg"
img = Image.open(img_path)

# 结合 TensorBoard 进行使用
writer = SummaryWriter("logs")

# 1、transforms 该如何使用
tensor_trans = transforms.ToTensor()
# 将 img 图片转换为 tensor 数据类型
tensor_img = tensor_trans(img)

writer.add_image("Tensor_img", tensor_img)
writer.close()
```

## PyTorch 代码实战

### 张量(Tensor)的通道排序

在 PyTorch 中，张量（Tensor）是存储和操作数据的基本数据结构。对于图像数据，PyTorch 通常使用四维张量来表示，其形状为 `[batch, channel, height, width]`：

```python
[batch, channel, height, width]
# Batch（批量大小），表示一次输入到模型中的样本数量
# Channel（通道数），表示每个样本的特征通道数
#     对于图像数据，通道通常表示颜色通道（如 RGB 图像的通道数为 3）。
#     在中间层，通道可以表示特征图的数量（如卷积层的输出通道数）
# Height（高度）
# Width（宽度）
```

### 卷积后尺寸大小计算公式

$$
H_{out} = \frac{H - K + 2P}{S} + 1
$$

$$
W_{out} = \frac{W - K + 2P}{S} + 1
$$

其中：

- H、W：输入特征图的高度和宽度
- K：卷积核的高度和宽度（通常为方形，如 3x3）
- S：步长，即卷积核每次移动的像素数
- P：填充，即在输入图像边缘补充的像素数
- H_out、W_out：输出特征图的高度和宽度

---

**示例 1：无填充，步长为 1**

假设输入特征图大小为 7x7，使用 3x3 卷积核，步长 S=1，填充 P=0：

$$
H_{out} = \frac{7 - 3 + 2(0)}{1} + 1 = 5
$$

$$
W_{out} = \frac{7 - 3 + 2(0)}{1} + 1 = 5
$$

输出特征图大小为 **5x5**。

---

**示例 2：填充 1，步长为 1**

如果填充 P=1（即在输入边缘每侧填充 1 像素）：

$$
H_{out} = \frac{7 - 3 + 2(1)}{1} + 1 = 7
$$

$$
W_{out} = \frac{7 - 3 + 2(1)}{1} + 1 = 7
$$

输出特征图大小变为 **7x7**。

### 权重初始化

**作用**：

- **防止梯度消失或爆炸**：不当的初始化可能会导致梯度逐层消失或放大，影响训练效果。
- **加快收敛速度**：适当的初始化可以帮助网络更快地收敛，提高训练效率。
- **提升模型性能**：合理的初始化方式可以提高最终模型的泛化能力。

#### 权重初始化方法对比

选择哪种权重初始化，主要是看网络模型采用的是哪种**激活函数**。

| 初始化方法 | 适用场景 |
| --- | --- |
| **Xavier 初始化** | Sigmoid / Tanh |
| **Kaiming 初始化** | ReLU / LeakyReLU |
| **正态分布** | 任意 |
| **全零初始化** | 不推荐 |

**Xavier 初始化**

$$
Var(W) = \frac{1}{n_{in} + n_{out}}
$$

**Kaiming 初始化**

$$
Var(W) = \frac{2}{n_{in}}
$$

**正态分布**

$$
W \sim \mathcal{N}(0, 0.01)
$$

**全零初始化**

$$
W = 0
$$
