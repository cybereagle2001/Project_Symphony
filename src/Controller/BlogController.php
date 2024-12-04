<?php

namespace App\Controller;

use App\Repository\BlogPostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class BlogController extends AbstractController
{
    #[Route('/blog', name: 'app_blog')]
    public function index(Request $request, BlogPostRepository $blogPostRepository): Response
    {
        $page = $request->query->getInt('page', 1);
        $limit = 9; // Number of posts per page

        $blogPosts = $blogPostRepository->findBy(
            [], // criteria
            ['createdAt' => 'DESC'], // orderBy
            $limit, // limit
            ($page - 1) * $limit // offset
        );

        $total = $blogPostRepository->count([]);
        $totalPages = ceil($total / $limit);

        return $this->render('blog/index.html.twig', [
            'blog_posts' => $blogPosts,
            'current_page' => $page,
            'total_pages' => $totalPages
        ]);
    }
}
