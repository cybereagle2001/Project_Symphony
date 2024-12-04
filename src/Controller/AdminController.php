<?php

namespace App\Controller;

use App\Repository\AuthorRepository;
use App\Repository\BlogPostRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/admin')]
class AdminController extends AbstractController
{
    #[Route('/', name: 'admin_dashboard')]
    public function index(AuthorRepository $authorRepository, BlogPostRepository $blogPostRepository): Response
    {
        return $this->render('admin/dashboard.html.twig', [
            'authors_count' => $authorRepository->count([]),
            'posts_count' => $blogPostRepository->count([]),
            'recent_posts' => $blogPostRepository->findBy([], ['createdAt' => 'DESC'], 5),
        ]);
    }
}
