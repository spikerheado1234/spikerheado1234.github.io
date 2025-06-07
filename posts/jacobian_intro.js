// This function should be defined in your main script.js before this file is loaded,
// or these calls will queue up and be processed when main script.js defines it and processes the queue.
// For simplicity, we'll define it globally and assume main script.js will use the collected data.

_registerBlogPost({
  id: "jacobian-intro", // A unique ID, can be derived from filename
  title: "Jacobian's and Linear-Maps",
  date: "2025-06-06",
  markdownContent: `
## Jacobian's and Linear-Maps

The problem of computing the gradient of a high-dimensional function has applications to deep-learning & scientific-computing (amongst others). However, when dealing with spaces $\\in \\mathbb{R}^{100}++$, it's unclear *what* the gradient means. In 2 & 3-dimensional space the gradient amounts to the "slope", as is commonly taught in grade-school, which is easily digestible. However, applying this intuition to any higer-dimensional function is not as pedagogically helpful as it is unclear what a "slope" is in higher-dimensions.

This post is a gentle introduction on what the gradient of higher-dimensional functions are, and what they *geometrically* mean. What this will amount to is the conclusion that the gradient of a higher-dimensional function is a Jacobian: a matrix that represents the linear-map of a function at a particular point in higher-dimensional space. This is a mouthfull, so we'll break this down into digestible chunks: first explaining the high level intuition in 1-D, followed by what linear maps are, and finally picing everything together by relating it back to the Jacobian.

### Thinking about gradients in 1-D

Let's start with the 1-dimensional case. Suppose we have a function: $y=x^2 + 1$ and we want to compute the gradient of at x=7. What exactly does this mean, *geometrically*?

Intuitively, this means to come up with a "scaling" factor at the point 7, such that when multiplied by a small change in x, $dx$, we yield a corresponding change in y, $dy$. Mathematically, we would write it as follows:

$dy=y'(7)*dx$

The gradient here corresponds to the value of $y'(7)$ (which amounts to 14 in this case).

Ultimately, we can use this fact to capture how much the function, $y$, changes at the point $x=7$ by computing: y(7+dx) ~= y(7)+dy.

Now, it's important to note that when we look at the gradient like this, *only for small values of dx* will this hold to be accurate. We can show this in the following table, fixing x to be 7:


| dy      | dx | x | f'(x) | y(x)+dy | y(x+dx) | $\\Delta$
| ----------- | ----------- | ----------- | ----------- |----------- |----------- |----------- |
| 14      | 1       | 7      | 14       | 64      | 65       |1       |
| 1.4      | 0.1          | 7      | 14       | 51.4      | 51.41       |0.01         |
| 0.14      | 0.01        | 7      | 14       | 50.14      | 50.1401      |0.0001      |
| 0.14      | 0.001       | 7      | 14       | 50.014      | 50.014001   | 0.000001    |


As we can see from the table, for smaller values of $dx$ we more accurately estimate the value of y(x+dx), i.e. for smaller values of $dx$: $y(x+dx) \\rightarrow  y(x)+dy$.

Formally, the factor we're multiplying $dx$ in the equation: $dy=y'(7)*dx$ by, i.e. $y'(7)$, is known as a *linear-map*.

### Linear Maps

Broadly speaking, a linear map is a *transformation* of points in a space. To be more pedantic, mathematicians define a linear map as a function that maps points in a certain space to points in a *different* space such that certain geometric properties are preserved.

Ironically, many of us have encountered linear maps, either in mathemtics or in computer science. For example, common linear maps are: rotations, translations and reflections. In each, we take the entire space that we're in and we geometrically transform it into another space by applying said transformation.

Let's illustrate what we mean through an example. Suppose we have the following grid (on the left), and apply a rotation to it; we get the the grid on the right:

<img src="images/rotation.png" alt="Responsive Image" style="width:60%; max-width:600px; height:auto; display:block; margin-left:auto; margin-right:auto;">

We observe that *all the points* are accordingly rotated (with respect to the origin), with the following three properties preserved:
1. The origin remains unchanged.
2. The grid lines remain parallel.
3. Even spacings between pairs of distances remain even despite the transformation (indicated by the red arrows in the figure).

Importantly, linear maps can be represented as matrices. For example, the matrix representation a rotation on a 2-D plane is:

$$
\\begin{bmatrix}
cos(θ) & -sin(θ) \\\\\\\\
sin(θ) &  cos(θ)
\\end{bmatrix}
$$

Now, why are we talking about linear-maps again?

Recall, the earlier example that the gradient of the function: $y=x^2+1$ when written like:  $dy=y'(7)*dx$ results in $y'(7)$ being a linear-map. It's just that in this case, the linear-map is a 1x1 matrix: $\\begin{bmatrix}2x\\end{bmatrix}$, evaluated at the point x=7 would be: $\\begin{bmatrix}14\\end{bmatrix}$. Relating this back to a transformation of the coordinate system, this matrix represents a *stretch*.

### Gradients in Higher-D and Jacobians

For higher-dimensional functions, pretty much everything remains the same. Suppose we have a function: $y(x_1, x_2)=(x_1^2+1, x_2^3+2)$. Then, similar to the 1-D case, we can compute the gradient, which we will denote as $J(\\overrightarrow{x})$, also known as the Jacobian matrix. We can again use this to compute how changes in $\\overrightarrow{dx}$ materialize changes in $\\overrightarrow{dy}$ by computing: $\\overrightarrow{dy} = J(\\overrightarrow{x}) * \\overrightarrow{dx}$. The Jacobian here also functions as a *linear-map*.

> Intuitively, a Jacobian is a matrix that represents a *linear approximation* of the change in $\\overrightarrow{dy}$ for corresponding changes in $\\overrightarrow{dx}$ at a particular point $\\overrightarrow{x}$.

How do we compute the Jacobian? The Jacobian is simply the partial derivatives of every function with respect to every input variable. Relating it back to our 2-D function, the jacobian looks like:

$\\begin{bmatrix}
\\frac{\\delta y_1}{\\delta x_1} & \\frac{\\delta y_1}{\\delta x_2} \\\\\\\\
\\frac{\\delta y_2}{\\delta x_1} & \\frac{\\delta y_2}{\\delta x_2}
\\end{bmatrix}$ = $\\begin{bmatrix}
\\frac{\\delta x_1^2+1}{\\delta x_1} & \\frac{\\delta x_1^2+1}{\\delta x_2} \\\\\\\\
\\frac{\\delta x_2^3+2}{\\delta x_1} & \\frac{\\delta x_2^3+2}{\\delta x_2}
\\end{bmatrix}$ = $\\begin{bmatrix}
2x_1 & 0 \\\\\\\\
0 & 3x_2^2
\\end{bmatrix}$

Which will change depending on the specific values of $x_1$ and $x_2$.

Hold on for one second though. If Jacobian's are linear-maps, how can this express non-linear gradients?

The intuition here is that even if gradients are non-linear, when zoomed enough into a particular point, they can be accurately approximated by a *linear-map*. However, this linear map will change depending on the point we've zoomed into.

> The gradients of any function, either non-linear or linear, when zoomed into a particular point, can be accurately approximated by a linear-map. Therefore, the Jacobian can be used to compute gradients even when gradients are non-linear.

To summarize, the Jacobian is a matrix that represents a linear-map localised to a particular point. It determines the factor that a function changes by with respect to changes in inputs. It is also the gradient of a function.

` // End of markdownContent template literal
});
